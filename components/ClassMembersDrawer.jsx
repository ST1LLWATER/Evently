import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Button, Accordion, Group, Avatar, Text } from "@mantine/core";
import { toggleClassMenu } from "../redux/sharedVariables";
import { loadUserData } from "../redux/userSlice";

function AccordionLabel({ label, image, description }) {
  return (
    <Group noWrap>
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

const ClassMembersDrawer = () => {
  const { sharedVariables, userData } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  return (
    <>
      <Drawer
        opened={sharedVariables.classMembersDrawer}
        onClose={() => dispatch(toggleClassMenu())}
        title="Class Ke Bande Kyuki Bandi To Hai Nai"
        padding="xl"
        size="xl"
      >
        <Accordion initialItem={-1} iconPosition="right">
          {sharedVariables.allUsers &&
            sharedVariables.allUsers.map((banda, key) =>
              banda.year === userData.year ? (
                <Accordion.Item
                  key={key}
                  label={
                    <AccordionLabel
                      image={`https://avatars.dicebear.com/api/initials/${banda.username}.svg`}
                      label={banda.username}
                      description={banda.roll_no.toUpperCase()}
                    />
                  }
                >
                  <Text size="sm">
                    Itna Chubhne Laga Hu Sabko... Kahi Chura To Nahi
                  </Text>
                </Accordion.Item>
              ) : null
            )}
        </Accordion>
      </Drawer>
    </>
  );
};

export default ClassMembersDrawer;
