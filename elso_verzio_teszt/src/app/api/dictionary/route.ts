import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// A fájl elérési útja
const filePath = path.join(process.cwd(), 'data', 'dictionary.json');

export async function GET() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Hiba a fájl beolvasásakor.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { hungarian, english } = await request.json();
        const data = fs.readFileSync(filePath, 'utf8');
        const words = JSON.parse(data);

        // Új szó hozzáadása
        words.push({ magyar: hungarian, angol: english });
        fs.writeFileSync(filePath, JSON.stringify(words, null, 2));

        return NextResponse.json({ message: 'Sikeresen hozzáadva!' });
    } catch (error) {
        return NextResponse.json({ error: 'Hiba a fájl mentésekor.' }, { status: 500 });
    }
}
