import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'otletek.json');

// get
export async function GET() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Hiba a fájl beolvasásakor.' }, { status: 500 });
    }
}

//post
export async function POST(request: Request) {
    try {
        const { newIdea } = await request.json();
        const data = fs.readFileSync(filePath, 'utf8');
        const ideas = JSON.parse(data);
        //hozzáadás
        ideas.push({ idea: newIdea });
        fs.writeFileSync(filePath, JSON.stringify(ideas, null, 2));

        return NextResponse.json({ message: 'Ötlet sikeresen hozzáadva!' });
    } catch (error) {
        return NextResponse.json({ error: 'Hiba a fájl mentésekor.' }, { status: 500 });
    }
}
