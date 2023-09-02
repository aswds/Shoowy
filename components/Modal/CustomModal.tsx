import { Button, StyleSheet, Text, View } from "react-native";
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
  Modal,
} from "@gluestack-ui/themed";

interface CModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  text: string;
  title: string;
}

const CustomModal: React.FC<CModalProps> = ({
  visible,
  onClose,
  onSubmit,
  text,
  title,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" fontFamily={"Bold"}>
            {title}
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text fontFamily={"Medium"}>{text}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={onClose}
            title={"Cancel"}
          />

          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={onSubmit}
            title={"Explore"}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
