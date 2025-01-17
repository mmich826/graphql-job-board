type Query {
    jobs: [Job]
    job(id: ID!): Job
    company(id: ID!): Company
}

type Job {
    id: ID!
    title: String
    description: String
    company: Company
}

type Company {
    id: ID!
    name: String
    description: String
    jobs: [Job]
}

type Mutation {
    createJob(input: CreateJobInput): Job
}

input CreateJobInput {
    companyId: ID
    title: String
    description: String
}
