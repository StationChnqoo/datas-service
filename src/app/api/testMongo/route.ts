import client from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * http://localhost:3000/api/testMongo
 * @param reqest
 * @returns
 */
export async function GET(reqest: NextRequest) {
  const db = client.db("sample_mflix");
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(10)
    .toArray();
  return NextResponse.json({
    data: movies,
    env: process.env.ENV,
  });
}
