'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Plus, Calendar } from 'lucide-react';
import { Booking, BookingFormData, SearchFilters } from '@/types/booking';
import { mockBookings } from '@/data/mockBookings';
import { Button } from '@/components/ui/Button';
import { SearchFilter } from '@/components/dashboard/SearchFilter';
import { BookingTable } from '@/components/dashboard/BookingTable';
import { BookingForm } from '@/components/booking/BookingForm';
import { EmailConfirmation } from '@/components/email/EmailConfirmation';
import { PaymentView } from '@/components/payment/PaymentView';
import { Modal } from '@/components/ui/Modal';

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Modal states
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  // Handle filters
  const handleFilterChange = (filters: SearchFilters) => {
    let filtered = [...bookings];

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (b) => new Date(b.travelDateTime) >= new Date(filters.dateFrom!)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (b) => new Date(b.travelDateTime) <= new Date(filters.dateTo!)
      );
    }

    // Filter by booking number
    if (filters.bookingNumber) {
      filtered = filtered.filter((b) =>
        b.bookingNumber.toLowerCase().includes(filters.bookingNumber!.toLowerCase())
      );
    }

    // Filter by passenger name
    if (filters.passengerName) {
      filtered = filtered.filter((b) =>
        b.passengerName.toLowerCase().includes(filters.passengerName!.toLowerCase())
      );
    }

    // Filter by flight number
    if (filters.flightNumber) {
      filtered = filtered.filter((b) =>
        b.flightNumber.toLowerCase().includes(filters.flightNumber!.toLowerCase())
      );
    }

    // Filter by payment status
    if (filters.paymentStatus && filters.paymentStatus !== 'all') {
      filtered = filtered.filter((b) => b.paymentStatus === filters.paymentStatus);
    }

    // Filter by job status
    if (filters.jobStatus && filters.jobStatus !== 'all') {
      filtered = filtered.filter((b) => b.jobStatus === filters.jobStatus);
    }

    setFilteredBookings(filtered);
  };

  // Handle create/edit booking
  const handleBookingSubmit = (data: BookingFormData) => {
    if (editingBooking) {
      // Update existing booking
      const updated = bookings.map((b) =>
        b.id === editingBooking.id
          ? {
              ...b,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : b
      );
      setBookings(updated);
      setFilteredBookings(updated);
      alert('แก้ไข Booking สำเร็จ!');
    } else {
      // Create new booking
      const newBooking: Booking = {
        id: String(bookings.length + 1),
        bookingNumber: `BK${format(new Date(), 'yyyyMMdd')}${String(bookings.length + 1).padStart(3, '0')}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        paymentStatus: 'unpaid',
        jobStatus: 'pending',
        emailSentAt: new Date().toISOString(),
      };

      const updated = [...bookings, newBooking];
      setBookings(updated);
      setFilteredBookings(updated);
      alert(`สร้าง Booking สำเร็จ! Booking Number: ${newBooking.bookingNumber}`);
    }

    setShowBookingForm(false);
    setEditingBooking(null);
  };

  // Handle view details
  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  // Handle edit
  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setShowBookingForm(true);
  };

  // Handle send email
  const handleSendEmail = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowEmailModal(true);
  };

  // Handle view payment
  const handleViewPayment = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowPaymentModal(true);
  };

  // Get today's bookings count
  const todayBookings = filteredBookings.filter((b) => {
    const bookingDate = format(new Date(b.travelDateTime), 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');
    return bookingDate === today;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Frontdesk Dashboard</h1>
              <p className="text-gray-500 mt-1">จัดการรายการจองและติดตามสถานะ</p>
            </div>
            <Button onClick={() => setShowBookingForm(true)} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              สร้าง Booking ใหม่
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Bookings วันนี้</p>
                <p className="text-2xl font-bold text-gray-900">{todayBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{filteredBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ยังไม่ชำระ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredBookings.filter((b) => b.paymentStatus === 'unpaid').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <SearchFilter onFilterChange={handleFilterChange} />

        {/* Bookings Table */}
        <BookingTable
          bookings={filteredBookings}
          onViewDetails={handleViewDetails}
          onSendEmail={handleSendEmail}
          onEdit={handleEdit}
          onViewPayment={handleViewPayment}
        />
      </main>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <Modal
          isOpen={showBookingForm}
          onClose={() => {
            setShowBookingForm(false);
            setEditingBooking(null);
          }}
          title={editingBooking ? 'แก้ไข Booking' : 'สร้าง Booking ใหม่'}
          size="xl"
        >
          <BookingForm
            booking={editingBooking || undefined}
            onSubmit={handleBookingSubmit}
            onCancel={() => {
              setShowBookingForm(false);
              setEditingBooking(null);
            }}
          />
        </Modal>
      )}

      {/* Email Confirmation Modal */}
      <EmailConfirmation
        booking={selectedBooking}
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setSelectedBooking(null);
        }}
      />

      {/* Payment View Modal */}
      <PaymentView
        booking={selectedBooking}
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedBooking(null);
        }}
      />

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedBooking(null);
          }}
          title="รายละเอียด Booking"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Booking Number:</span>
                <p className="font-semibold text-gray-900">{selectedBooking.bookingNumber}</p>
              </div>
              <div>
                <span className="text-gray-500">สร้างเมื่อ:</span>
                <p className="font-semibold text-gray-900">
                  {format(new Date(selectedBooking.createdAt), 'dd MMM yyyy HH:mm', { locale: th })}
                </p>
              </div>
              <div>
                <span className="text-gray-500">ผู้โดยสาร:</span>
                <p className="font-semibold text-gray-900">{selectedBooking.passengerName}</p>
              </div>
              <div>
                <span className="text-gray-500">เบอร์โทร:</span>
                <p className="font-semibold text-gray-900">{selectedBooking.phone}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">อีเมล:</span>
                <p className="font-semibold text-gray-900">{selectedBooking.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Flight:</span>
                <p className="font-semibold text-gray-900">{selectedBooking.flightNumber}</p>
              </div>
              <div>
                <span className="text-gray-500">เวลาเดินทาง:</span>
                <p className="font-semibold text-gray-900">
                  {format(new Date(selectedBooking.travelDateTime), 'dd MMM yyyy HH:mm', { locale: th })}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">จุดรับ:</span>
                <p className="font-semibold text-gray-900">{selectedBooking.pickupLocation}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">จุดส่ง:</span>
                <p className="font-semibold text-gray-900">{selectedBooking.dropoffLocation}</p>
              </div>
              {selectedBooking.note && (
                <div className="col-span-2">
                  <span className="text-gray-500">หมายเหตุ:</span>
                  <p className="font-semibold text-gray-900">{selectedBooking.note}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedBooking(null);
                }}
              >
                ปิด
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
