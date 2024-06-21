const router = require("express").Router();
const TransactionController = require("../controller/transaction.controller");
const swaggerJSDoc = require("swagger-jsdoc");
const test = require("../edotor");
const transactionRouter = (io) => {
  const transactionController = new TransactionController(io);
  
  /**
     * @swagger
     * /users/wallet-connect:
     *   post:
     *     summary: Connects VNpay to a user wallet and creates a new transaction for payment.
     *     tags: [User]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               walletAddress:
     *                 type: string
     *                 description: The user's wallet address.
     *                 example: "0x7b54ea3b6f9Ed4D80925D7d6C7E820C4e245818d"
     *               amount:
     *                 type: number
     *                 description: The amount of payment in VND.
     *                 example: 100000
     *             required:
     *               - walletAddress
     *               - amount
     *     responses:
     *       200:
     *         description: Payment URL for the VNpay transaction.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 paymentUrl:
     *                   type: string
     *                   description: The VNpay payment URL for the transaction.
     *                   example: "https://sandbox.vnpayment.vn/...&vnp_SecureHash=..."
     *       400:
     *         description: Invalid or incomplete request body.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Request body is incomplete."
     *                 errorCode:
     *                   type: number
     *                   example: 400
     *                 data:
     *                   type: object
     *                   example: {}
     */
  router.post("/wallet-connect", transactionController.connectVNpaytoWallet);
  router.post("/wallet-withdraw", transactionController.withdrawMoney);
  router.get("/me/transaction-history", transactionController.getTransactionHistory);
  router.get("/me/wallet", transactionController.getWallet);

  router.get("/notifications", transactionController.getNotification);
  router.put("/notifications/:notificationId", transactionController.checkNotification);
  router.get("/requests", transactionController.getUserRequest);

  router.get("/invoices/rented", transactionController.getAllInvoiceRenter);
  router.get("/invoices/leased", transactionController.getAllInvoiceOwner);
  router.get("/invoices/:invoiceId", transactionController.getInvoiceById);

  router.post("/contract/:contractId/cancel-by-renter", transactionController.cancelByRenter);
  router.post("/contract/:contractId/cancel-by-lessor", transactionController.cancelContractByLessor);
  router.post("/contract/:contractId/extend-by-renter", transactionController.sendRequestToExtend);
  router.post("/contract/accept/:requestId", transactionController.acceptRequest);
  router.post("/contract/accept-extend/:requestId", transactionController.acceptRequestExtendContract);
  router.post("/payment-test", transactionController.testPayment);
  router.get("/contract/:roomId", transactionController.getContractOfRoom);

  router.post("/room/:roomId/feedback", transactionController.feedBackRoom);
  router.post("/room/:roomId/report", transactionController.reportRoom);

  router.get("/me/profile", transactionController.getProfile); // not yet
  router.patch("/me/avatar", transactionController.changeAvatar); // not yet
  return router;
};

module.exports = transactionRouter;
