import * as React from 'react';
import { useEffect, useState } from 'react';
import { ProjectSummary } from './project-summary';
import {
    Deployment,
    DisplayResult,
    Environment,
    Project,
    Release,
} from './types';

/**
 *  Project Container that handles all filtering logics before passing data into actualy release retention summary
 *  assuming all data received at the beginning and only related deployments and releases are passed to release retention summary
 */
export const ProjectContainer: React.FC<{
    project: Project;
    releases?: Release[];
    environments: Environment[];
    deployments?: Deployment[];
}> = ({ project, releases = [], environments, deployments = [] }) => {
    const [latestDeployments, setLatestDeployments] = useState<
        DisplayResult[] | null
    >(null);

    // get all releases belongs to a project
    const getRelatedReleases = ({
        releases,
        projectId,
    }: {
        releases: Release[];
        projectId: string;
    }) => {
        if (releases.length === 0) return [];
        return releases.filter(release => release.ProjectId === projectId);
    };

    // get all deploys belongs to a project
    const getRelatedDeploys = ({
        relatedReleases,
        deployments,
    }: {
        relatedReleases: Release[];
        deployments: Deployment[];
    }) => {
        const relatedReleaseIds = relatedReleases.map(
            relatedRelease => relatedRelease.Id,
        );
        return deployments.filter(
            deployment => relatedReleaseIds.indexOf(deployment.ReleaseId) >= 0,
        );
    };

    // get release by Id
    const getReleaseById = (id: string, releases: Release[]) => {
        return releases.find(release => release.Id === id);
    };

    // get lastest deploy in one environment
    const getLatestDeploymentInEnv: (
        environment: Environment,
        deployments: Deployment[],
    ) => Deployment | undefined = (environment, deployments) => {
        // filter only deployments belong to the environment
        const results = deployments.filter(
            deployment => deployment.EnvironmentId === environment.Id,
        );

        //if no deploys found for the env, return undefined
        if (results.length === 0) return undefined;

        // else order by DeployedAt DESC
        results.sort(function(x, y) {
            // if found multiple deploys deployed at the sametime
            // rare case but not impossible
            if (Date.parse(y.DeployedAt) === Date.parse(x.DeployedAt)) {
                // comparing by Id - assuming every deploy Id is creared incrementally
                // return ordering by Id DESC
                return (
                    parseInt(y.Id.split('-')[1]) - parseInt(x.Id.split('-')[1])
                );
            }
            return Date.parse(y.DeployedAt) - Date.parse(x.DeployedAt);
        });

        // only latest deployment is selected
        return results[0];
    };

    // get lastest deploy in each environment that belong to the release of the project
    const getLatestDeploymentForEachEnv = ({
        deployments,
        envs,
        releases,
    }: {
        deployments: Deployment[];
        envs: Environment[];
        releases: Release[];
    }) => {
        const results: DisplayResult[] = [];

        envs.forEach(env => {
            // get latest deploy in the environment from project's deployments (can be undefined)
            const latestDeploy = getLatestDeploymentInEnv(env, deployments);

            // if there is a latest deploy in the env, find the release
            // ( can be undefined if the release is no longer existed in the project releases for some reason)
            const releaseByDeploy = latestDeploy
                ? getReleaseById(latestDeploy.ReleaseId, releases)
                : undefined;

            // if the release existed then assign the deploy to display result
            const result = releaseByDeploy ? latestDeploy : undefined;

            results.push({
                environment: env,
                deployment: result,
                release: releaseByDeploy,
            });
        });

        return results;
    };

    useEffect(() => {
        // get all releases belong to the project (can be empty array)
        const filteredReleases = getRelatedReleases({
            releases,
            projectId: project.Id,
        });

        // get all deploys belong to the project (can be empty array)
        const filteredDeploys = getRelatedDeploys({
            relatedReleases: filteredReleases,
            deployments,
        });

        // if there is no deploy to the project found the no point going to the next step
        // summary of release retion will display empty table
        if (filteredDeploys.length === 0) {
            setLatestDeployments(null);
            return;
        }

        // filter out the latest deploy for each environment of the project
        const results = getLatestDeploymentForEachEnv({
            deployments: filteredDeploys,
            envs: environments,
            releases: filteredReleases,
        });

        // set the released retention result
        setLatestDeployments(results);
    }, [releases, deployments, environments]);

    useEffect(() => {
        // this result log should only run in production build
        if (
            latestDeployments &&
            latestDeployments.length > 0 &&
            process.env.NODE_ENV === 'production'
        ) {
            latestDeployments.map(({ environment, release }) => {
                if (release) {
                    // @TODO intergrate with api to log result
                    console.log(
                        `${project.Id}: ${release.Id} kept because it was the most recently deployed to ${environment.Id}`,
                    );
                }
            });
        }
    }, [latestDeployments]);

    return (
        <ProjectSummary
            project={project}
            latestDeployments={latestDeployments}
        />
    );
};
