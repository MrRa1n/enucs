type CommitteeMemberType = {
    first_name: string;
    last_name: string;
    role_name: string;
    image_url: string;
    member_since: string;
    twitter_url: string;
    github_url: string;
}

export default class CommitteeMember {
    first_name: string;
    last_name: string;
    role_name: string;
    image_url: string;
    member_since: string;
    twitter_url: string;
    github_url: string;

    constructor(member: CommitteeMemberType) {
        this.first_name = member.first_name;
        this.last_name = member.last_name;
        this.role_name = member.role_name;
        this.image_url = member.image_url;
        this.member_since = member.member_since;
        this.twitter_url = member.twitter_url;
        this.github_url = member.github_url;
    }

    public static fromArray(array: CommitteeMemberType[]): CommitteeMember[] {
        return array.map(member => new CommitteeMember(member));
    }
}
