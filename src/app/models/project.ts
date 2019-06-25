import { Design } from './design';

export class Project {
    ProjectID?: string;
    ProjectName: string;
    DateCreated: string;
    DateModified: string;
    DesignList?: Array<Design>;
    UserID?: string;
}
