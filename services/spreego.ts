import { LineService } from "./line";

export namespace SpreeGOService {
  export function start(reqBody: any): Promise<any> {
    return LineService.init(reqBody);
  }
}
