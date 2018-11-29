export default class LocalStorageUtil {

  public static setCurrentUserId(id: number): void {
    this.set('currentUserID', id);
  }

  public static getCurrentUserId(): number {
    return this.get('currentUserID');
  }
  public static removeCurrentUserId(): void {
    sessionStorage.removeItem("currentUserID");
  }
  public static setFriendshipId(id: number): void {
    this.set('friendshipId', id);
  }

  public static getFriendshipId(): number {
    return this.get('friendshipId');
  }

  public static removeFriendshipId(): void {
    sessionStorage.removeItem("friendshipId");
  }

  private static set(key: string, value: number): void {
    sessionStorage.setItem(key, value.toString());
  }

  private static get(key: string): number {
    return parseInt(sessionStorage.getItem(key));
  }

}
