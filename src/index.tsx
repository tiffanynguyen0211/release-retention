import * as React from 'react';
import { ProjectContainer } from './project-container';
// import { ProjectSummary } from './project-summary';
import { Deployment, Environment, Project, Release } from './types';

/**
 *  React Component that display all projects with release retention info in each project
 *  assuming all data received at the beginning
 */
export const ReleaseRetension: React.FC<{
    projects?: Project[];
    releases?: Release[];
    environments?: Environment[];
    deployments?: Deployment[];
}> = ({ projects, releases = [], environments, deployments = [] }) => {
    // render empty react fragment if there is no project or environments data
    // assuming this feature is not handling display all releases without environment ready
    if (!projects || !environments || environments.length === 0) return <></>;

    return (
        <div>
            {projects.map(project => (
                <ProjectContainer
                    key={project.Id}
                    project={project}
                    releases={releases}
                    deployments={deployments}
                    environments={environments}
                />
            ))}
        </div>
    );
};
