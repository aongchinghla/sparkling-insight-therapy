import { NextResponse } from 'next/server';

// Mock Data for demonstration
const MOCK_PURCHASED_VIDEOS = [
  {
    id: 'vid_1',
    title: 'Anxiety Relief Breathing Exercise',
    purchaseDate: '2024-03-25',
    vimeoLink: 'https://vimeo.com/manage/videos/123456789', // Use real Vimeo links here
    downloadEnabled: true,
  },
  {
    id: 'vid_2',
    title: 'Morning Yoga for Mental Clarity',
    purchaseDate: '2024-03-20',
    vimeoLink: 'https://vimeo.com/manage/videos/987654321',
    downloadEnabled: false,
  }
];

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const lowerEmail = email.trim().toLowerCase();

    // DEMO LOGIC: 
    // If user enters 'test@example.com', return mock videos.
    // Otherwise, return empty list (simulating no purchases found).
    if (lowerEmail === 'test@example.com') {
      return NextResponse.json({
        success: true,
        videos: MOCK_PURCHASED_VIDEOS
      });
    }

    return NextResponse.json({
      success: true,
      videos: []
    });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
