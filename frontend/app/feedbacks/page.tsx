'use client';

import PrivateLayout from "../components/PrivateLayout";
import Feedbacks from "./Feedbacks";

export default function FeedbacksPage() {
  return (
    <PrivateLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <Feedbacks />
        </div>
      </div>
    </PrivateLayout>
  );
}
