import { WallExtend } from './wallextend';
import { Door } from './door';

export class Wallwindowdoormodel {
    ID?: string;
    Wall: WallExtend;
    Window: Array<any>;
    Door: Door;
    ProjectID?: string;
    DesignID?: string;
    UserID?: string;
}
