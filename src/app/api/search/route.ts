import { NextRequest, NextResponse } from 'next/server'

interface CustomRequest extends NextRequest {
  prompt?: string
  useSynonyms: boolean
  limit?: number
}

export async function POST(req: CustomRequest) {
  if (!process.env.SEARCH_API_URL || !process.env.API_AUTH_KEY) {
    throw new Error('API URL or Auth Key is not defined')
  }
  const body = await req.json()
  const { prompt, limit } = body || {}
  const apiUrl = process.env.SEARCH_API_URL
  const data = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.API_AUTH_KEY,
    },
    body: JSON.stringify({ prompt, useSynonyms: true, limit }),
  })
  const result = await data.json()

  return NextResponse.json(result)
}
