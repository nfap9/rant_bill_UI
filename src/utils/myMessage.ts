import { ElMessage } from "element-plus";

export default {
  success: (message: string) => {
    ElMessage({
      message,
      type: "success",
    });
  },
  error: (message: string) => {
    ElMessage({
      message,
      type: "error",
    });
  },
  warning: (message: string) => {
    ElMessage({
      message,
      type: "warning",
    });
  },
  info: (message: string) => {
    ElMessage({
      message,
      type: "info",
    });
  },
};
