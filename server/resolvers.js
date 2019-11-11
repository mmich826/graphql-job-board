const db = require('./db');

const Query = {
    jobs: () => {
        return db.jobs.list();
    },
    job: (root, { id }) => {
        return db.jobs.get(id);
    }
};

const Job = {
    company: (job) => {
        return db.companies.get(job.companyId);
    }
}

module.exports = { Query, Job }
