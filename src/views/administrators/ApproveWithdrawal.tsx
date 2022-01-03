/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import {
  Card,
  CardFooter,
  CardHeader,
  Container,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from 'reactstrap';
import { administratorService } from '../../services/administrator/api';
import { TypeContent } from './interface';

enum Role {
  Admin = 'Admin',
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
}
interface Withdrawal {
  _id: string;
  authorId: {
    _id: string;
    username: string;
    email: string;
    role: Role;
    avatar: string;
  };
  createdAt: Date;
  status: number;
  type: string;
  amount: number;
  numberPhone: string;
  updatedAt: Date;
}
const ApproveContent: React.FC = () => {
  const [withdrawal, setWithDrawal] = useState<Array<Withdrawal>>([]);
  const [page, setPage] = useState(1);
  const [withdrawalShow, setWithdrawalShow] = useState<Array<Withdrawal>>([]);
  const memberOnePage = 5;
  useEffect(() => {
    administratorService.getRequestWithdrawal().then((res) => {
      setWithDrawal(res.data.data);
    });
  }, [page]);
  useEffect(() => {
    let _dataShow = [];
    let min = (page - 1) * memberOnePage;
    let max = page * memberOnePage - 1;
    if (min < 0) {
      min = 0;
    }
    if (max > withdrawal.length - 1) {
      max = withdrawal.length - 1;
    }
    for (let i = min; i <= max; i++) {
      _dataShow.push(withdrawal[i]);
    }
    setWithdrawalShow([..._dataShow]);
  }, [withdrawal, page]);
  const handleWithDrawal = (_id: string, status: boolean) => {
    administratorService
      .handleStatus({
        _id: _id,
        status: status,
        type: TypeContent.money,
      })
      .then((res) => {
        setWithDrawal(res.data.data);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  function RowBlog(props: { withdrawal: Withdrawal; index: number }) {
    return (
      <tr style={{ textAlign: 'center' }}>
        <th scope="row">{props.index}</th>
        <th scope="row">
          <Media
            className="align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {}}>
            <div
              className="avatar mr-3"
              // href="#pablo"
            >
              <img
                height="50"
                alt="..."
                src={
                  props.withdrawal?.authorId?.avatar === ''
                    ? '/image/avatar.png'
                    : props.withdrawal?.authorId?.avatar
                }
                // src={require('assets/img/theme/bootstrap.jpg')}
              />
            </div>
            <Media>
              <span className="mb-0 text-sm">
                {props.withdrawal?.authorId?.username}
              </span>
            </Media>
          </Media>
        </th>
        <th scope="row">{props.withdrawal.authorId.email}</th>
        <td style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {props.withdrawal.amount}
        </td>
        <td>{props.withdrawal.numberPhone}</td>
        <td>
          {props.withdrawal.status === 1 && (
            <i className="fas fa-check" style={{ color: 'green' }}></i>
          )}
          {props.withdrawal.status === -1 && (
            <i className="fas fa-times" style={{ color: 'red' }}></i>
          )}
        </td>
        <td>
          <a className="table-action" href="#pablo" id="tooltip564981685">
            {props.withdrawal.status === 0 && (
              <>
                <button
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={() => {
                    handleWithDrawal(props.withdrawal._id, true);
                  }}>
                  Phê duyệt
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    handleWithDrawal(props.withdrawal._id, false);
                  }}>
                  Từ chối
                </button>
              </>
            )}
          </a>
        </td>
        <td className="text-right"></td>
      </tr>
    );
  }
  return (
    <div className="approve-content" style={{ overflowY: 'hidden' }}>
      <Container fluid>
        <Row>
          <div className="col">
            <Card className="shadow mt-4">
              <CardHeader className="border-0 d-flex flex-row align-content-center justify-content-between">
                <h3 className="mb-0">Phê duyệt rút tiền</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr style={{ textAlign: 'center' }}>
                    <th scope="col">stt</th>
                    <th scope="col">Username</th>
                    <th scope="col">Gmail</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Number phone</th>
                    <th scope="col">Status</th>
                    <th scope="col">Function</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {withdrawalShow.map((wd, index) => (
                    <RowBlog withdrawal={wd} index={index + 1}></RowBlog>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0">
                    <PaginationItem>
                      <PaginationLink
                        onClick={(e) => {
                          if (page === 1) {
                            return;
                          }
                          setPage(page - 1);
                        }}>
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {Array.from(
                      {
                        length: Math.ceil(withdrawal.length / memberOnePage),
                      },
                      (_, index) => index + 1,
                    ).map((value, index) => {
                      return (
                        <>
                          <PaginationItem
                            className={index + 1 === page ? 'active' : ''}>
                            <PaginationLink
                              onClick={(e) => {
                                setPage(index + 1);
                              }}>
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      );
                    })}
                    <PaginationItem>
                      <PaginationLink
                        onClick={(e) => {
                          if (
                            page ===
                            Math.ceil(withdrawal.length / memberOnePage)
                          ) {
                            return;
                          }
                          setPage(page + 1);
                        }}>
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default ApproveContent;
