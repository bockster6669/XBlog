import AdditionalOptionsPage from '@/components/profile/AdditionalOptionsPage';
import ProfileTabs from '@/components/profile/ProfileTabs';

export default function ProfileManager() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      <ProfileTabs />

      <div className="mt-8 space-y-4">
        <AdditionalOptionsPage />
      </div>
    </div>
  );
}
