import { AddressUSA, PhoneUSA } from "@prisma/client";
import prisma from "../../lib/prisma";

export async function updateAddressesNotPrimary(address: AddressUSA) {
  if (address.isPrimaryMailingAddr) {
    // side effect: one primary address only
    await prisma.addressUSA.updateMany({
      where: {
        NOT: {
          id: address.id,
        },
        userId: address.userId,
      },
      data: {
        isPrimaryMailingAddr: false,
      },
    });
  }
}

export async function updatePhonesNotPrimary(phone: PhoneUSA) {
  if (phone.isPrimaryPhone) {
    // side effect: one primary phone only
    await prisma.phoneUSA.updateMany({
      where: {
        NOT: {
          id: phone.id,
        },
        userId: phone.userId,
      },
      data: {
        isPrimaryPhone: false,
      },
    });
  }
}
