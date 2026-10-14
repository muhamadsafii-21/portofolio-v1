import { getProfile } from "@/lib/queries";
import { saveProfile } from "./actions";
import { uploadImage } from "./upload";
import ProfileForm from "./ProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminProfile() {
  const profile = await getProfile();
  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Profil</h1>
      <ProfileForm profile={profile} saveAction={saveProfile} uploadAction={uploadImage} />
    </div>
  );
}
