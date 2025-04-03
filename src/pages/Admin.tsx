
import { useState } from "react";
import RsvpList from "@/components/admin/RsvpList";

const Admin = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="wedding-container">
        <h1 className="section-title mb-6">Administration</h1>
        
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
          <RsvpList />
        </div>
      </div>
    </div>
  );
};

export default Admin;
