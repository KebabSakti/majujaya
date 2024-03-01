-- AlterTable
ALTER TABLE `Order` MODIFY `statusOrder` ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    MODIFY `statusPayment` ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    MODIFY `statusShipping` ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `OrderStatus` MODIFY `status` ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `PaymentStatus` MODIFY `status` ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `ShippingStatus` MODIFY `status` ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING';
