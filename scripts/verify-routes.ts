import { GET, PATCH, DELETE } from '../app/api/bookings/[id]/route';
import { NextRequest } from 'next/server';

// Mock global fetch
global.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    const urlString = url.toString();
    console.log(`[Mock Fetch] ${init?.method || 'GET'} ${urlString}`);

    if (urlString.includes('/bookings/booking-123')) {
        if (init?.method === 'DELETE') {
            return {
                ok: true,
                json: async () => ({
                    success: true,
                    data: { id: 'booking-123', status: 'cancelled' }
                })
            } as Response;
        }
        return {
            ok: true,
            json: async () => ({
                success: true,
                data: {
                    id: 'booking-123',
                    booking_number: 'B-123',
                    passenger_name: 'Test Passenger',
                    status: 'pending'
                }
            })
        } as Response;
    }

    return {
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' })
    } as Response;
};

async function runVerification() {
    console.log('--- Verifying GET /api/bookings/[id] ---');
    const getReq = new NextRequest('http://localhost:3000/api/bookings/booking-123');
    const getRes = await GET(getReq, { params: Promise.resolve({ id: 'booking-123' }) });
    const getData = await getRes.json();
    console.log('GET Result:', JSON.stringify(getData, null, 2));

    console.log('\n--- Verifying DELETE /api/bookings/[id] ---');
    const delReq = new NextRequest('http://localhost:3000/api/bookings/booking-123', {
        method: 'DELETE',
        body: JSON.stringify({ cancellation_reason: 'Test reason' })
    });
    const delRes = await DELETE(delReq, { params: Promise.resolve({ id: 'booking-123' }) });
    const delData = await delRes.json();
    console.log('DELETE Result:', JSON.stringify(delData, null, 2));
}

runVerification().catch(console.error);
