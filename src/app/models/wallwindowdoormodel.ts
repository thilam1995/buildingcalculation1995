import { WallExtend } from './wallextend';
import { Door } from './door';

export class Wallwindowdoormodel {
    Wall: WallExtend;
    Window: Array<any>;
    Door: Door;
    ProjectID?: string;
    DesignID?: string;
    UserID?: string;
}
