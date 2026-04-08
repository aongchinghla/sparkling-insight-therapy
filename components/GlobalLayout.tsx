'use client';

import React from 'react';
import { ModalProvider, useModal } from '@/context/ModalContext';
import Navbar from '@/components/Navbar';
import AppointmentModal from '@/components/ui/AppointmentModal';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';
import Footer from '@/components/Footer';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
      <WhatsAppChatbot />
    </>
  );
}

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </ModalProvider>
  );
}
