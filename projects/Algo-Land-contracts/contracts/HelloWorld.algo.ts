import { Contract } from '@algorandfoundation/tealscript';

export class Land extends Contract {
  userID = GlobalStateKey<uint64>();

  landID = GlobalStateKey<uint64>();

  titleDeedID = GlobalStateKey<uint64>();

  setKey(value: uint64): void {
    this.landID.value = value; // On chain: landID now contains value
  }

  registerLand(userID: uint64, landID: uint64, titleDeedID: uint64): string {
    this.userID.value = userID;
    this.landID.value = landID;
    this.titleDeedID.value = titleDeedID;

    return 'Registration Successful';
  }

  verifyLand(landID: uint64): string {
    // Read the details from the global state
    const existingUserID = Global.readAppVar(`${landID}-userID`);
    const existingTitleDeedID = Global.readAppVar(`${landID}-titleDeedID`);

    if (existingUserID !== undefined && existingTitleDeedID !== undefined) {
      return `LandID: ${landID}, UserID: ${existingUserID}, TitleDeedID: ${existingTitleDeedID}`;
    } else {
      return 'Land ID does not exist';
    }
  }
}
