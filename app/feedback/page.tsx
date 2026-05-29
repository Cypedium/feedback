'use client';
import Feedback from "../dashboard/Feedback";
import PrivateLayout from "../PrivateLayout";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <PrivateLayout>
            <Feedback />
        </PrivateLayout>
    </div>
  );
}