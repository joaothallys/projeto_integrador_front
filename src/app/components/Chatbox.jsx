import { useCallback, useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import Clear from "@mui/icons-material/Clear";
import TagFaces from "@mui/icons-material/TagFaces";
import Attachment from "@mui/icons-material/Attachment";

import { H5, H6, Span } from "./Typography";
import { ChatAvatar } from "app/components";
import { convertHexToRGB } from "app/utils/utils";

// STYLED COMPONENTS
const ChatContainer = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "#fff"
});

const StyledScrollBar = styled(ScrollBar)({ flexGrow: 1 });

const ProfileBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 12px 12px 20px",
  color: theme.palette.primary.main,
  background: "#fafafa"
}));

const ChatStatus = styled("div")(({ theme }) => ({
  marginLeft: "12px",
  color: theme.palette.primary.main,
  "& span": { fontWeight: "500" },
  "& h5": { marginTop: 0, fontSize: "14px", marginBottom: "3px" }
}));

const ChatMessage = styled("div")(({ theme }) => ({
  padding: "8px",
  maxWidth: 240,
  fontSize: "14px",
  borderRadius: "4px",
  marginBottom: "8px",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  color: theme.palette.primary.main,
  background: "#fafafa"
}));

const MessageTime = styled("span")(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

const ChatImgContainer = styled("div")({
  padding: "20px",
  display: "flex",
  justifyContent: "flex-end"
});

const ChatImgBox = styled("div")(({ theme }) => ({
  padding: "8px",
  fontSize: "14px",
  maxWidth: 240,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: theme.palette.primary.main,
  background: "#fafafa"
}));

const ChatImg = styled("img")(() => ({ width: "40px" }));

// for previewing bot message
const globalMessageList = [];

export default function Chatbox({ togglePopup }) {
  const [isAlive, setIsAlive] = useState(true);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const currentUserId = "7863a6802ez0e277a0f98534";
  const chatBottomRef = document.querySelector("#chat-scroll");

  const sendMessageOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      let tempMessage = message.trim();
      if (tempMessage !== "") {
        let tempList = [...messageList];
        let messageObject = {
          text: tempMessage,
          contactId: currentUserId
        };
        tempList.push(messageObject);
        globalMessageList.push(messageObject);
        if (isAlive) setMessageList(tempList);
        dummyReply();
      }
      setMessage("");
    }
  };

  const dummyReply = async () => {
    setTimeout(() => {
      let tempList = [...messageList];
      let messageObject = {
        text: "Good to hear from you. enjoy!!!",
        contactId: "opponents contact id",
        avatar: "/assets/images/faces/13.jpg",
        name: "Frank Powell"
      };

      tempList.push(messageObject);
      globalMessageList.push(messageObject);
      if (isAlive) setMessageList(globalMessageList);
    }, 2000);
  };

  const scrollToBottom = useCallback(() => {
    if (chatBottomRef) {
      chatBottomRef.scrollTo({
        top: chatBottomRef.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatBottomRef]);

  useEffect(() => {
    if (isAlive) {
      setMessageList([

      ]);
    }
  }, [isAlive]);

  useEffect(() => {
    scrollToBottom();
    return () => setIsAlive(false);
  }, [messageList, scrollToBottom]);

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const textPrimary = palette.text.primary;

  return (
    <ChatContainer>
      <ProfileBox>
        <Box display="flex" alignItems="center">
          <ChatStatus>
            <H5>Ryan Todd</H5>
            <Span>Active</Span>
          </ChatStatus>
        </Box>
        <IconButton onClick={togglePopup}>
          <Clear fontSize="small" />
        </IconButton>
      </ProfileBox>
      <StyledScrollBar id="chat-scroll">
        {messageList.map((item, ind) => (
          <Box
            key={ind}
            p="20px"
            display="flex"
            sx={{ justifyContent: currentUserId === item.contactId && "flex-end" }}>
            {currentUserId !== item.contactId && <Avatar src={item.avatar} />}
            <Box ml="12px">
              {currentUserId !== item.contactId && (
                <H5 mb={0.5} fontSize={14} color={primary}>
                  {item.name}
                </H5>
              )}
              <ChatMessage>{item.text}</ChatMessage>
            </Box>
          </Box>
        ))}

        {/* example of image sent by current user*/}
        <ChatImgContainer>
          <Box ml="12px">
            <ChatImgBox>
            </ChatImgBox>
          </Box>
        </ChatImgContainer>
      </StyledScrollBar>

      <div>
        <Divider sx={{ background: `rgba(${convertHexToRGB(textPrimary)}, 0.15)` }} />

        <TextField
          multiline
          fullWidth
          rowsMax={4}
          value={message}
          placeholder="Type here ..."
          onKeyUp={sendMessageOnEnter}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ "& textarea": { color: primary } }}
          slotProps={{
            input: {
              endAdornment: (
                <Box display="flex">
                  <IconButton size="small">
                    <TagFaces />
                  </IconButton>

                  <IconButton size="small">
                    <Attachment />
                  </IconButton>
                </Box>
              ),
              classes: { root: "pl-5 pr-3 py-3 text-body" }
            }
          }}
        />
      </div>
    </ChatContainer>
  );
}
