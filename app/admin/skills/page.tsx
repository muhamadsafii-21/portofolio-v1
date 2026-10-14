import { getSkills } from "@/lib/queries";
import { addSkill, deleteSkill } from "../actions";
import SkillsAdmin from "./SkillsAdmin";

export const dynamic = "force-dynamic";

export default async function AdminSkills() {
  const skills = await getSkills();
  return <SkillsAdmin skills={skills} addAction={addSkill} deleteAction={deleteSkill} />;
}
