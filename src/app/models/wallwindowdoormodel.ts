import { WallExtend } from './wallextend';
import { Door } from './door';

export class Wallwindowdoormodel {
    ID?: string;
    Wall: WallExtend;
    Window: Array<any>;
    Door: Array<any>;
    ProjectID?: string;
    DesignID?: string;
    UserID?: string;
}
