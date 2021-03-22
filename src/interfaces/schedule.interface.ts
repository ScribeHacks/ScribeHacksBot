interface Event {
    name: string;
    timeStamp: Date;
    time: Date;
    day: number;
    happened: boolean;
    description?: string;
}
// https://timestampgenerator.com/ and choose Atom
const CheckIn = {
    name: "Doors Open, Check In",
    timeStamp: new Date("2021-09-18T08:00:00-07:00"),
    time: new Date("September 18, 2021 08:00:00"),
    day: 0,
    happened: false
}

const OpeningCeremony = {
    name: "Opening Ceremony",
    timeStamp: new Date("2021-09-18T09:00:00-07:00"),
    time: new Date("September 18, 2021 09:00:00"),
    day: 0,
    happened: false
}

const HackingBegins = {
    name: "Hacking Begins",
    timeStamp: new Date("2021-09-18T10:00:00-07:00"),
    time: new Date("September 18, 2021 10:00:00"),
    day: 0,
    happened: false
}

const Lunch = {
    name: "Lunch",
    timeStamp: new Date("2021-09-18T13:00:00-07:00"),
    time: new Date("September 18, 2021 13:00:00"),
    day: 0,
    happened: false
}

const CaptureTheFlag = {
    name: "Capture The Flag (Digital)",
    timeStamp: new Date("2021-09-18T16:00:00-07:00"),
    time: new Date("September 18, 2021 16:00:00"),
    day: 0,
    happened: false
}

const Dinner = {
    name: "Dinner",
    timeStamp: new Date("2021-09-18T19:00:00-07:00"),
    time: new Date("September 18, 2021 19:00:00"),
    day: 0,
    happened: false
}

const SuperSmashBrosTournament = {
    name: "Super Smash Bros. Tournament",
    timeStamp: new Date("2021-09-18T20:00:00-07:00"),
    time: new Date("September 18, 2021 20:00:00"),
    day: 0,
    happened: false
}

const MidnightSnack = {
    name: "Midnight Snack",
    timeStamp: new Date("2021-09-19T00:00:00-07:00"),
    time: new Date("September 19, 2021 00:00:00"),
    day: 0,
    happened: false
}

const ProjectSubmissions = {
    name: "Project Submissions",
    timeStamp: new Date("2021-09-19T09:00:00-07:00"),
    time: new Date("September 19, 2021 09:00:00"),
    day: 1,
    happened: false
}

const ClosingCeremony = {
    name: "Closing Ceremony",
    timeStamp: new Date("2021-09-19T13:00:00-07:00"),
    time: new Date("September 19, 2021 13:00:00"),
    day: 1,
    happened: false
}

const VirtualAfterparty = {
    name: "Virtual Afterparty",
    timeStamp: new Date("2021-09-19T19:00:00-07:00"),
    time: new Date("September 19, 2021 19:00:00"),
    day: 1,
    happened: false
}
export const Events: Array<Event> = [CheckIn, OpeningCeremony, HackingBegins, Lunch, CaptureTheFlag, Dinner, SuperSmashBrosTournament, MidnightSnack, ProjectSubmissions, ClosingCeremony, VirtualAfterparty];
