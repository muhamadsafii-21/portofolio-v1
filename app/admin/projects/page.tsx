import { getProjects } from "@/lib/queries";
import { addProject, deleteProject } from "../actions";
import ProjectsAdmin from "./ProjectsAdmin";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  const projects = await getProjects();
  return <ProjectsAdmin projects={projects} addAction={addProject} deleteAction={deleteProject} />;
}
