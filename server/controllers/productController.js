const { StatusCodes } = require("http-status-codes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    res.status(StatusCodes.CREATED).json(newCategory);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err, message: "Unable to create category" });
  }
};

const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    discount,
    cover_image,
    images,
    sizeAndQuantity,
    categories,
  } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        discount,
        cover_image,
        images,
        ProductSizeRelation: {
          create: sizeAndQuantity.map((info) => ({
            productSize: { connect: { id: info.id } },
            quantity: info.quantity,
          })),
        },
        categories: {
          connect: categories.map((id) => ({ id })),
        },
      },
    });
    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err, message: "Unable to create product" });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        ProductSizeRelation: {
          include: {
            productSize: true,
          },
        },
        categories: true,
      },
    });
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found." });
    }

    return res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err, message: "Unable to get product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
        ProductSizeRelation: {
          include: {
            productSize: true,
          },
        },
      },
    });
    if (!products) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No products to show." });
    }
    return res.status(StatusCodes.OK).json(products);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    c;
  }
};

const addSize = async (req, res) => {
  const { size } = req.body;
  try {
    const newSize = await prisma.productSizes.create({
      data: {
        size: size,
      },
    });
    res.status(StatusCodes.CREATED).json(newSize);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err, message: "Unable to create size object" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No categories to show." });
    }
    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "No categories to show." });
  }
};

const getSizes = async (req, res) => {
  try {
    const sizes = await prisma.productSizes.findMany();
    if (!sizes) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No sizes to show" });
    }
    return res.status(StatusCodes.OK).json(sizes);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err, message: "Unable to get sizes" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return res.status(StatusCodes.OK).json(deletedProduct);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err, message: "Unable to delete product" });
  }
};

const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id); // Get the product ID from the request
  const {
    name,
    description,
    price,
    discount,
    cover_image,
    images,
    sizeAndQuantity,
    categories,
  } = req.body; // Assuming you're passing the updated data in the request body

  try {
    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
        discount,
        cover_image,
        images,
        ProductSizeRelation: {
          deleteMany: {},
          create: sizeAndQuantity.map((info) => ({
            productSize: { connect: { id: info.id } },
            quantity: info.quantity,
          })),
        },
        categories: {
          disconnect: await prisma.product
            .findUnique({
              where: { id: productId },
              select: { categories: { select: { id: true } } },
            })
            .then((product) =>
              product.categories.map((cat) => ({ id: cat.id }))
            ),
          connect: categories.map((id) => ({ id })),
        },
      },
    });

    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    // Handle errors (e.g., product not found, invalid data)
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product." });
  }
};
module.exports = {
  addCategory,
  addProduct,
  addSize,
  getProduct,
  getProducts,
  getCategories,
  getSizes,
  deleteProduct,
  updateProduct,
};
