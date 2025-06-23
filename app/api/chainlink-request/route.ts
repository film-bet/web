import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_TYPES = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'SEASONAL',
  'QUARTERLY',
  'YEARLY',
  'HEALTH',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { requestType, additionalParam = '', options = {} } = body;

    if (!requestType || !SUPPORTED_TYPES.includes(requestType)) {
      return NextResponse.json({ error: 'Invalid or missing requestType' }, { status: 400 });
    }

    // Dynamically import the request functions server-side only
    const requestScript = await import('../../../chainlink-getters/request-script.js');

    let fn;
    switch (requestType) {
      case 'DAILY':
        fn = requestScript.requestDailyData;
        break;
      case 'WEEKLY':
        fn = requestScript.requestWeeklyData;
        break;
      case 'MONTHLY':
        fn = requestScript.requestMonthlyData;
        break;
      case 'SEASONAL':
        fn = requestScript.requestSeasonalData;
        break;
      case 'QUARTERLY':
        fn = requestScript.requestQuarterlyData;
        break;
      case 'YEARLY':
        fn = requestScript.requestYearlyData;
        break;
      case 'HEALTH':
        fn = requestScript.requestHealthCheck;
        break;
      default:
        return NextResponse.json({ error: 'Unsupported requestType' }, { status: 400 });
    }

    const result = await fn(additionalParam, options);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
} 