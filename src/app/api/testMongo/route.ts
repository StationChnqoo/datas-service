import client from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * http://localhost:3000/api/testMongo
 * @param reqest
 * @returns
 */
export async function GET(request: NextRequest) {
  const { current = 1, pageSize = 10 } = await request.json();
  // 计算分页的跳过数量
  const skip = (current - 1) * pageSize;
  const db = client.db("sample_mflix");
  const total = await db.collection("movies").countDocuments();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .skip(skip)
    .limit(pageSize)
    .toArray();
  return NextResponse.json({
    current,
    pageSize,
    success: true,
    total,
    data: movies,
    env: process.env.ENV,
  });
}
