import React from "react";
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  ModalFooter,
  ButtonText,
  Button,
  Text,
  Modal,
} from "@gluestack-ui/themed";
import Colors from "../../constants/Colors";
import { ViewStyle } from "react-native";
interface CModalProps {
  visible: boolean;
  onClose?: () => void;
  closeButtonText?: string;
  onSubmit: () => void;
  submitButtonText?: string;
  submitButtonProps?: React.ComponentProps<typeof Button>;
  text: string;
  title: string;
}

const CustomModal: React.FC<CModalProps> = ({
  visible,
  closeButtonText,
  submitButtonText,
  onClose,
  onSubmit,
  text,
  title,
  submitButtonProps,
}) => {
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" fontFamily={"Bold"} color={"$error300"}>
            {title}
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text fontFamily={"Medium"} color={Colors.secondaryText}>
            {text}
          </Text>
        </ModalBody>
        <ModalFooter>
          {onClose && (
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={onClose}
              backgroundColor={"white"}
            >
              <ButtonText> {closeButtonText ?? "Cancel"}</ButtonText>
            </Button>
          )}
          {onSubmit && (
            <Button
              size="sm"
              action="positive"
              backgroundColor={Colors.hot}
              borderWidth="$0"
              onPress={onSubmit}
              {...submitButtonProps}
            >
              <ButtonText fontFamily={"Bold"}>
                {submitButtonText ?? "Submit"}
              </ButtonText>
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
