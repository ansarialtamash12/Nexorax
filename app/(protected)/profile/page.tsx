"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { EditProfileForm } from "./components/EditProfileForm";
import { ChangePasswordForm } from "./components/ChangePasswordForm";

export default function ProfilePage() {
  const tabs = [
    {
      id: "edit-profile",
      label: "Edit Profile",
      content: <EditProfileForm />,
    },
    {
      id: "change-password",
      label: "Change password",
      content: <ChangePasswordForm />,
    },
  ];

  return (
    <div className="profile-page">
      <PageHeader title="Profile" description="Manage your personal information." />
      <Tabs tabs={tabs} defaultTab="edit-profile" card className="profile-tabs" />
    </div>
  );
}
