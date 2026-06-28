'use client';
import Layout from "../components/Layout";
import Feedbacks from "./feedbacks";

export default function FeedbacksPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <Feedbacks />
        </div>
      </div>
    </Layout>
  );
}