class UrbaneboltMapper {
  toCourierRequest(order) {
    return [
      {
        customerCode:  process.env.URBANEBOLT_CUSTOMER_CODE,
        orderNumber: order.orderId,

        declaredValue: order.declaredValue,

        itemDescription: order.itemDescription,

        collectableValue: order.collectableValue,

        height: order.height,

        length: order.length,

        breadth: order.breadth,

        weight: order.weight,

        pieces: order.pieces,

        serviceType: order.serviceType,

        payMode: order.payMode,

        rtnCity: order.return.city,
        rtnName: order.return.name,
        rtnEmail: order.return.email,
        rtnState: order.return.state,
        rtnMobile: order.return.mobile,
        rtnAddress: order.return.address,
        rtnAddressType: order.return.addressType,
        rtnCountry: order.return.country,
        rtnPincode: order.return.pincode,

        shprCity: order.shipper.city,
        shprName: order.shipper.name,
        shprEmail: order.shipper.email,
        shprState: order.shipper.state,
        shprMobile: order.shipper.mobile,
        shprAddress: order.shipper.address,
        shprAddressType: order.shipper.addressType,
        shprCountry: order.shipper.country,
        shprPincode: order.shipper.pincode,

        consCity: order.consignee.city,
        consName: order.consignee.name,
        consEmail: order.consignee.email,
        consState: order.consignee.state,
        consMobile: order.consignee.mobile,
        consAddress: order.consignee.address,
        consAddressType: order.consignee.addressType,
        consCountry: order.consignee.country,
        consPincode: order.consignee.pincode,

        invoiceNumber: order.invoice.number,
        invoiceDate: order.invoice.date,
        invoiceValue: order.invoice.value,

        itemQuantity: order.itemQuantity,
      },
    ];
  }

  toApplicationResponse(response) {
    return response;
   
  }
}

export default new UrbaneboltMapper();
