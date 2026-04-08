import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FORMATS = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const cvFile = formData.get('cv') as File;

    // Validation
    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!cvFile) {
      return NextResponse.json(
        { message: 'CV file is required' },
        { status: 400 }
      );
    }

    // Validate file size
    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Validate file format
    if (!ALLOWED_FORMATS.includes(cvFile.type)) {
      return NextResponse.json(
        { message: 'Only PDF, DOC, and DOCX files are allowed' },
        { status: 400 }
      );
    }

    // Create applications directory if it doesn't exist
    const applicationsDir = path.join(process.cwd(), 'applications');
    if (!fs.existsSync(applicationsDir)) {
      fs.mkdirSync(applicationsDir, { recursive: true });
    }

    // Save CV file
    const timestamp = Date.now();
    const fileExt = cvFile.name.substring(cvFile.name.lastIndexOf('.'));
    const fileName = `${name.replace(/\s+/g, '_')}_${email.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}${fileExt}`;
    const filePath = path.join(applicationsDir, fileName);

    const bytes = await cvFile.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    // Create application record
    const applicationData: ApplicationData & { timestamp: string; fileName: string } = {
      name,
      email,
      phone,
      position,
      experience,
      coverLetter,
      timestamp: new Date().toISOString(),
      fileName,
    };

    // Save application data to JSON file
    const applicationsJsonPath = path.join(applicationsDir, 'applications.json');
    let applications = [];

    if (fs.existsSync(applicationsJsonPath)) {
      const fileContent = fs.readFileSync(applicationsJsonPath, 'utf-8');
      applications = JSON.parse(fileContent);
    }

    applications.push(applicationData);
    fs.writeFileSync(applicationsJsonPath, JSON.stringify(applications, null, 2));

    // TODO: Send email notification
    // You can integrate with email services like SendGrid, Nodemailer, etc.
    // example: await sendEmailNotification(applicationData);

    return NextResponse.json(
      {
        message: 'Application submitted successfully',
        applicationId: timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
