import { NextResponse } from 'next/server';

let homepageData = {
    title: 'Welcome to Our Site!',
    imageUrl: '/default-home.jpg',
};

export async function GET() {
    return NextResponse.json(homepageData);
}

export async function POST(req: Request) {
    const body = await req.json();
    homepageData = { ...homepageData, ...body };
    return NextResponse.json({ success: true });
}
