import { allowCorsHeaders, DB } from "@/constants";
import client from "@/lib/mongodb";
import { corsMiddleware } from "@/middlewares/corsMiddleware";
import { NextRequest, NextResponse } from "next/server";

/**
 * http://localhost:3000/api/testMongo
 * @param reqest
 * @returns
 */
export async function GET(request: NextRequest) {
  let params = request.nextUrl.searchParams;
  let current = parseInt(params.get("current") ?? `1`);
  let pageSize = parseInt(params.get("pageSize") ?? `10`);
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
  return NextResponse.json(
    {
      current,
      pageSize,
      success: true,
      total,
      data: movies,
      env: process.env.ENV,
    },
    { headers: allowCorsHeaders }
  );
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: allowCorsHeaders, status: 204 });
}
