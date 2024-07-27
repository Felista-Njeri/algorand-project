import { Contract } from '@algorandfoundation/tealscript';

export class Land extends Contract {
  landReferenceAndTitleDeed = GlobalStateKey<string>();

  createApplication(): void {
    this.landReferenceAndTitleDeed.value = '';
  }

  registerLand(landReferenceAndTitleDeed: string): void {
    // Get the current value from the global state
    const currentValue = this.landReferenceAndTitleDeed.value;

    // Concatenate the current value with the new value
    const newValue = currentValue + landReferenceAndTitleDeed;

    // Set the new concatenated value back to the global state
    this.landReferenceAndTitleDeed.value = newValue;
  }

  getLand(): string {
    // Get the current value from the global state
    return this.landReferenceAndTitleDeed.value;
  }
}
