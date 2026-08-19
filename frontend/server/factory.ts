import { NextMiddleware, NextResponse } from 'next/server'

// Defines a factory that takes the *next* middleware and returns a new middleware
export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware
