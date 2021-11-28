export type Deployment = {
    Id: string;
    ReleaseId: string;
    EnvironmentId: string;
    DeployedAt: string;
};

export type Environment = {
    Id: string;
    Name: string;
};

export type Project = { Id: string; Name: string };

export type Release = {
    Id: string;
    ProjectId: string;
    Version: string | null;
    Created: string;
};

export type DisplayResult = {
    environment: Environment;
    deployment?: Deployment;
    release?: Release;
};
