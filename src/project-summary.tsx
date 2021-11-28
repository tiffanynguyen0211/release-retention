import * as React from 'react';
import { DisplayResult, Project } from './types';

/**
 *  Project summary dummy component that display release rentention result
 * and which deployment linked to the release to which environment
 * @example <caption>if there is/are release(s) to display as table row</caption>
 * |  Releases  | env      | deployment   |
 * |------------|----------|--------------|
 * | release-1  | env-1    | deploy-1     |
 *
 * @example <caption>if there is no release to keep display table without data rows </caption>
 * |  Releases  | env      | deployment   |
 * |------------|----------|--------------|
 *
 */
export const ProjectSummary: React.FC<{
    project: Project;
    latestDeployments: DisplayResult[] | null;
}> = ({ project, latestDeployments }) => {
    return (
        <div>
            <h1>{project.Name}</h1>
            {latestDeployments && (
                <table>
                    <thead>
                        <tr>
                            <th>Release</th>
                            <th>Environment</th>
                            <th>Deployment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestDeployments.map(
                            ({ deployment, release, environment }) =>
                                deployment &&
                                release && (
                                    <tr key={deployment.Id}>
                                        <td>{`${release.Id} (Version:${release.Version}, Created:${release.Created})`}</td>
                                        <td>{environment.Id}</td>
                                        <td>{`${deployment.Id} (DeployedAt:${deployment.DeployedAt})`}</td>
                                    </tr>
                                ),
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};
