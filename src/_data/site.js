// Single source for starting date; derive the year from it so we don't repeat values.
const startingDate = '2008-09-01';
const startingYear = new Date(startingDate).getFullYear();

module.exports = {
    title: 'Roman Horokhovatskyy',
    description: 'Personal homepage of Roman Horokhovatskyy a Ukrainian multi-disciplinary digital designer based in Dublin, Ireland.',
    keywords: 'Roman, Horokhovatskyy, @horoman, @h0r0m4n, Product Design, Design Strategy, Interaction Design, User Interface Design, User Experience Design, Design Systems',
    author: 'Roman Horokhovatskyy',
    location: 'Dublin, Ireland',
    nickname: 'h0r0m4n',
    mail: 'me@horoman.com',
    // ISO starting date (year-month-day). Use a single canonical value.
    startingDate,
    // Convenience: starting year derived from `startingDate`
    startingYear,
    password: 376301,
    version: '6.9',
    environment: process.env.ELEVENTY_ENV,
    url: process.env.ELEVENTY_ENV === 'development' ? 'http://localhost:8080' : 'https://horoman.com'
};
