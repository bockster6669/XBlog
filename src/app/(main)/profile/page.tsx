import ProfileAdditionalOptions from '@/components/profile/profile-additional-options/ProfileAdditionalOptions';
import ProfileTabs from '@/components/profile/ProfileTabs';

export default function ProfileManager() {
  return (
    <main className="mt-8">
      <ProfileTabs />

      <div className="mt-8 space-y-4">
        <ProfileAdditionalOptions />
      </div>
    </main>
  );
}
