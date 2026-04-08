import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, paymentMethod, trxId, phoneLast3, videoId, price } = body;

    if (!email || !trxId || !phoneLast3 || !videoId) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    console.log('New Order Received:', { email, paymentMethod, trxId, phoneLast3, videoId, price });

    // TODO: Save to Supabase
    // const { error } = await supabase.from('orders').insert([{ email, paymentMethod, trxId, phoneLast3, videoId, price, status: 'pending' }]);

    return NextResponse.json({
      success: true,
      message: 'Order received successfully. We will verify your payment soon.',
    });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}