class EquipmentRequest {
  constructor(equipment) {
    this.weaponId = equipment.weaponId;
    this.armorId = equipment.armorId;
  }
}

module.exports = EquipmentRequest;