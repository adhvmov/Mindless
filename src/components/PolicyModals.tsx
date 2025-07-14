import React from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex justify-between items-center">
          <h2 className="text-lg font-medium text-black">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4 text-sm text-gray-600">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PolicyModals: React.FC<{
  activeModal: string | null;
  onClose: () => void;
}> = ({ activeModal, onClose }) => {
  const privacyContent = (
    <>
      <p>Your privacy is important to us. It is MINDLESS's policy to respect your privacy regarding any information we may collect from you across our website, http://mindlessclothing.com, and other sites we own and operate.</p>
      <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>
      <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
      <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information.</p>
    </>
  );

  const refundContent = (
    <>
      <p>We want you to be completely satisfied with your purchase. If you are not satisfied, you may return the item within 30 days of delivery for a full refund of the item price.</p>
      <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
      <p>To initiate a return, please contact our customer service team. We will provide you with a return shipping label and instructions.</p>
      <p>Once we receive your returned item, we will inspect it and notify you that we have received it. We will immediately notify you of the status of your refund after inspecting the item.</p>
      <p>If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within 5-10 business days, depending on your card issuer's policies.</p>
    </>
  );

  const shippingContent = (
    <>
      <p>We offer free standard shipping on all orders within Egypt. Orders are typically processed within 1-2 business days.</p>
      <p>Standard shipping typically takes 3-5 business days from the date of shipment. During peak seasons or sales events, delivery times may be slightly longer.</p>
      <p>Once your order ships, you will receive a confirmation email with tracking information. You can track your order's status at any time through your account or the link in your shipping confirmation email.</p>
      <p>For international shipping inquiries, please contact our customer service team.</p>
    </>
  );

  return (
    <>
      <PolicyModal
        isOpen={activeModal === 'privacy'}
        onClose={onClose}
        title="Privacy Policy"
        content={privacyContent}
      />
      <PolicyModal
        isOpen={activeModal === 'refund'}
        onClose={onClose}
        title="Refund Policy"
        content={refundContent}
      />
      <PolicyModal
        isOpen={activeModal === 'shipping'}
        onClose={onClose}
        title="Shipping Policy"
        content={shippingContent}
      />
    </>
  );
};

export default PolicyModals; 